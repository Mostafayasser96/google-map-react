import axiosLib from 'axios';

export const getCookie = (name: string) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
} 

// export const getCookie = (cookie: string): string => {
//   console.log('get cookie', document.cookie);
//   if(document.cookie){
//     const allCookies = document.cookie.split(';');
//     for(let i = 0; i < allCookies.length; i += 1){
//       const name = allCookies[i].split('=')[0].toLowerCase().trim();
//       const value = allCookies[i].split('=')[0].trim();
//       if(name === cookie){
//         return name;
//       }
//       if(value === cookie){
//         return value;
//       }
//     }
//   }
//   return '';
// }
const axiosInst = axiosLib.create({
  headers: {
    'Accept': 'Application/json',
    'Authorization': `Bearer ${getCookie('token')}`
  }
});
export default axiosInst;