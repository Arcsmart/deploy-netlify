import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// icons:[
//   {
//    src:'./public/favicon.icon' ,
//    sizes:'192X192',
//    type:'image/x-icon'
//   }
// ]
