
export     const OptionsDateTime:Intl.DateTimeFormatOptions = {
   day:'numeric',
   month: 'short',
   year: 'numeric',
   hour: 'numeric',
   minute: "numeric"
};

export     const OptionsDate:Intl.DateTimeFormatOptions = {
   day:'numeric',
   month: 'short',
   year: 'numeric',
};




export const convertSecondstoDate = (seconds:number) =>{
   return  new Date(seconds * 1000)
};