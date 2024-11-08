import type { NextConfig } from "next";
import { hostname } from "os";
// -----https--
// import autoCert from "anchor-pki/auto-cert/integrations/next";


// const withAutoCert = autoCert({
  
//   enabledEnv: "development",
// });
const nextConfig: NextConfig = {
  images: {
    
    remotePatterns:[
      {
      protocol:'https',
      hostname:'lh3.googleusercontent.com'
    },
      {
      protocol:'https',
      hostname:'avatars.githubusercontent.com'
    },
      {
      protocol:'https',
      hostname:'fakestoreapi.com'
    },
  ]
  },
};
export default nextConfig
// export default withAutoCert(nextConfig);
