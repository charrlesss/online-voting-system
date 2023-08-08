import { ExpressTypes } from "./Typing";
import express, { NextFunction, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import resolvers from "./Resolver/resolver";
import typeDefs from "./TypeDef/typedef";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { connect, ConnectOptions } from "mongoose";
import donenv from "dotenv";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { graphqlUploadExpress } from "graphql-upload";
import jwtDecode from "jwt-decode";
import useFindUserById from "./CustomFunction/FindUser";
import jwt from "jsonwebtoken";
import generateAccessToken from "./JWT/generateToken";
import * as IO from "socket.io";
import sokcetMidlleware from "./CustomFunction/socket";
import { createCandidates } from "./Schema/candidates";
import { sampleVotes } from "./Schema/sampleRegisteredVoters";
import { sampleAdminAccount } from "./Schema/adminSchema";
// import {sdasd} from './Schema/sampleRegisteredVoters';
if (process.env.NODE_ENV !== "production") {
  donenv.config();
}

async function main(): Promise<void> {
  const app = express();
  const httpServer = http.createServer(app);
  const io = new IO.Server(httpServer);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }: ExpressTypes) => ({ req, res }),
  });
  await server.start();

  var corsOptions: { origin: string; credentials: boolean } = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.cookies).length === 0) {
      return next();
    }

    try {
      const ACCESS_TOKEN: string = req.cookies["ACCESS_TOKEN"];
      const user: any = verify(
        ACCESS_TOKEN,
        process.env.ACCESS_TOKEN as string
      );
      req.userId = user._id as string;
      req.userEmail = user.email as string;
      next();
    } catch (err) {
      const REFRESH_TOKEN: string = req.cookies["REFRESH_TOKEN"];
      if (!REFRESH_TOKEN) {
        res.sendStatus(405);
      }
      const { _id }: any = jwtDecode(REFRESH_TOKEN);
      useFindUserById(_id)
        .then((data: any) => {
          if (data.securedDetails[0].refreshToken[0] !== REFRESH_TOKEN) {
            res.clearCookie("ACCESS_TOKEN");
            res.clearCookie("REFRESH_TOKEN");
          }
          res.clearCookie("ACCESS_TOKEN");

          jwt.verify(
            REFRESH_TOKEN,
            process.env.REFRESH_TOKEN as string,
            (err) => {
              if (err) {
                console.log("Here Me and I have Error:" + err);
                return res.sendStatus(405);
              }

              const NEW_ACCESS_TOKEN = generateAccessToken({
                _id: data._id,
                email: data.securedDetails[0].email,
              });
              res.cookie("ACCESS_TOKEN", NEW_ACCESS_TOKEN, {
                secure: true,
                httpOnly: true,
              });
            }
          );
          return res.sendStatus(401);
        })
        .catch((err: any) => {
          console.log("Here Me adn I have Error:" + err);
        });
    }
  });

  const authUserIO = io.of("/userAuthenticated");

  authUserIO.use(async (socket, next: any): Promise<void> => {
    await sokcetMidlleware(io, socket, next);
  });

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  connect(
    process.env.DB_URL as string,
    { useNewUrlParser: true } as ConnectOptions,
    (err: any): void => {
      if (err) {
        new Error("Error Found in Server to connect in mongoose");
      }
      httpServer.listen({ port: process.env.PORT }, (): void =>
        console.log("Listen in port 4000")
      );
    }
  );
}

main().catch((err): void => {
  console.error(err);
});
