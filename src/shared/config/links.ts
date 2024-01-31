interface ILinkCalendarAdd {
    text?: string;
    dates: string;
    details?: string;
    location?: string;
}

export const linkMapsRoute = 'https://www.google.com/maps/dir/?api=1&origin=&destination=';
export const linkCalendarAdd = ({
  text, dates, details, location,
}: ILinkCalendarAdd) => {
  return `http://www.google.com/calendar/event?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&trp=false&sprop=&sprop=${text}`;
};
