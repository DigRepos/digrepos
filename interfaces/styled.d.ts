import styled, * as styledComponents from 'styled-components'

const { 
    default: styled,
    keyframes
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>

export default styled
export { keyframes }
