declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      dark: string
      main: string
      light: string
      bodyBg: string
      darkBg: string
      lightBg: string
      tooltipBg: string
      tableHeaderBg: string
      buttonGradient:string
      white:string
      grey:string
      darkgrey:string
      lightgrey:string
      themeColor:string
      modal:string

      
    }
    linear_gradient:{
      cardGradient:string
      modalGradient:string
      multiGradient:string
      radialGradient:string
    }
  }

  interface PaletteOptions {
    customColors?: {
      dark?: string
      main?: string
      light?: string
      bodyBg?: string
      darkBg?: string
      lightBg?: string
      tooltipBg?: string
      tableHeaderBg?: string
      buttonGradient?:string
      white?:string
      grey?:string
      darkgrey?:string
      lightgrey?:string
      themeColor?:string
      modal?:string

    }
    linear_gradient?:{
      cardGradient?:string
      modalGradient?:string
      multiGradient?:string
      radialGradient?:string
    }
  }
}

export {}
