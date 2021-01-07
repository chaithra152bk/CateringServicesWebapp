module.exports = function (api) {   
  const presets = [ 
    [
      "@babel/env",
      {
          targets: {
            esmodules: true
          },
          useBuiltIns: "entry",
      },
    ],
    ["@babel/react",],
    ];   
  const plugins = [ 
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties"
    ];    
    api.cache(true)
  return {     
    presets,     
    plugins   
  }; 
}