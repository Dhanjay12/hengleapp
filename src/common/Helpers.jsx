export const app_url ="/hengleapp/";
export const api_url ="https://essaneinfotech.com/mhengleapp/api/";
export const api_assets_url ="https://essaneinfotech.com/mhengleapp/storage/app/public/";
export function getCurrentDate(Date){
    let separator = '-';
    let newDate = Date;
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let datenow =  `${date<10?`0${date}`:`${date}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    return datenow;
    // let datenow =  `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
  }
