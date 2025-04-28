const theme = {
  token: {
    "colorPrimary": "#7bb3dc",
    "colorPrimaryHover": "#a3d9e0",
    "colorSuccess": "#87e2c1",
    "colorWarning": "#f9c54e",
    "colorError": "#fd723f",
    "colorInfo": "#3d84bd",
    "colorBorder": "#1f3c5b",
    "colorBgContainer": "transparent",
    "colorText": "rgba(255, 255, 255, 0.85)",
    "fontSize": 18,
    "colorBgTextHover": "#1f3c5b66",
  },
  components: {
    Tabs: {
      "colorPrimary": "#a3d9e0",
      "colorPrimaryHover": "#a3d9e0",
      
      "colorSplit": "transparent",
      "colorBgContainer": "transparent",
      "colorText": "rgba(255, 255, 255)",
      "fontSize": 28,
      "colorBgTextHover": "#1f3c5b66",
      "lineWidth": 2,
    },
    Breadcrumb: {
      "colorTextDescription": "rgba(255, 255, 255, 0.5)",
      "colorText": "rgba(255, 255, 255)",
    },
    Input: {
      "colorTextDisabled": "rgba(255,255,255)"
    },
    Button: {
      "controlOutlineWidth": 0,
      "colorTextLightSolid": "#FFFFFF",
      "colorPrimary": "#3d84bd",
      "colorPrimaryActive": "#3d84bd",
      "colorPrimaryHover": "#7bb3dc"
    },
    
  },

}

const theme_mobile = {
  token: {
    "colorPrimary": "#7bb3dc",
    "colorPrimaryHover": "#a3d9e0",
    "colorSuccess": "#87e2c1",
    "colorWarning": "#f9c54e",
    "colorError": "#fd723f",
    "colorInfo": "#3d84bd",
    "colorBorder": "#1f3c5b",
    "colorBgContainer": "transparent",
    "colorText": "rgba(255, 255, 255, 0.85)",
    "fontSize": 16,
    "colorBgTextHover": "#1f3c5b66",
  },
  components: {
    Tabs: {
      "colorPrimary": "#a3d9e0",
      "colorPrimaryHover": "#a3d9e0",
      
      "colorSplit": "transparent",
      "colorBgContainer": "transparent",
      "colorText": "rgba(255, 255, 255)",
      "fontSize": 20,
      "colorBgTextHover": "#1f3c5b66",
      "lineWidth": 2,
    }
  }
}
export { theme, theme_mobile }