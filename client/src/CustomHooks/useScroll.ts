import React from 'react'

export default function useScrollPage() {
    const [isScroll, setIsScroll] = React.useState<boolean>(false);

    React.useEffect(() => {
      const clientScroll = () => {
        if (window.scrollY >= 100) {
            setIsScroll(true);
        } else {
            setIsScroll(false);
        }
      };
      window.addEventListener("scroll", clientScroll);
  
      return () => window.removeEventListener("scroll", clientScroll);
    }, [isScroll]);
   
    return {
        isScroll
    }
        
}