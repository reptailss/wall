
export     const OptionsDateTime:Intl.DateTimeFormatOptions = {
   day:'numeric',
   month: 'short',
   year: 'numeric',
   hour: 'numeric',
   minute: "numeric"
};

export     const OptionsDateTimeComment:Intl.DateTimeFormatOptions = {
   day:'numeric',
   month: 'numeric',
   year: 'numeric',
   hour: 'numeric',
   minute: "numeric"
};


export  const OptionsDate:Intl.DateTimeFormatOptions = {
   day:'numeric',
   month: 'short',
   year: 'numeric',
};


export  const OptionsDateNumber:Intl.DateTimeFormatOptions = {
   day:'numeric',
   month: 'numeric',
   year: 'numeric',
};




export const convertSecondstoDate = (seconds:number) =>{
   return  new Date(seconds * 1000)
};


export     const OptionsTimeMessage:Intl.DateTimeFormatOptions = {
   hour: 'numeric',
   minute: "numeric"
};


export     const OptionsYears:Intl.DateTimeFormatOptions = {
   hour: 'numeric',
   minute: "numeric"
};


export const getCurrentAge = (dateBirth: number) => {
   if (dateBirth) {
      const date = convertSecondstoDate(dateBirth)
      var ageDifMs = Date.now() - date.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970) + 'р.';
   }
};