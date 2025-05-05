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
    "colorTextDescription": "rgba(255, 255, 255, 0.5)",
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
      "colorTextDisabled": "rgba(255,255,255)",
      "colorTextQuaternary": "rgba(255, 255, 255, 0.5)",
      "colorTextPlaceholder": "rgba(255, 255, 255, 0.5)",
    },
    Button: {
      "controlOutlineWidth": 0,
      "colorTextLightSolid": "#FFFFFF",
      "colorPrimary": "#3d84bd",
      "colorPrimaryActive": "#3d84bd",
      "colorPrimaryHover": "#7bb3dc"
    },
    
    Modal: {
      "colorBgElevated": "#121619"
    },
    DatePicker: {
      "colorBgContainer": "#141414",
      "colorBgElevated": "#1f1f1f",
      "colorTextDescription": "rgba(255, 255, 255, 0.45)",
      "colorTextDisabled": "rgba(255, 255, 255, 0.25)",
      "colorTextPlaceholder": "rgba(255, 255, 255, 0.5)",
            "controlOutline": "rgba(107, 182, 245, 0.1)",
      "controlItemBgHover": "rgba(255, 255, 255, 0.1)",
            "colorIcon": "rgba(255, 255, 255, 0.45)",
      "colorIconHover": "rgba(255, 255, 255, 0.85)"
    }
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
    "colorTextDescription": "rgba(255, 255, 255, 0.5)",
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
    
    Modal: {
      "colorBgElevated": "#121619"
    }

  }
}
export { theme, theme_mobile }