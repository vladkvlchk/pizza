import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="130" /> 
    <rect x="55" y="278" rx="15" ry="10" width="160" height="30" /> 
    <rect x="0" y="325" rx="10" ry="10" width="281" height="84" /> 
    <rect x="0" y="440" rx="10" ry="10" width="89" height="30" /> 
    <rect x="126" y="432" rx="22" ry="22" width="150" height="44" />
  </ContentLoader>
)

export default MyLoader