export const CurrentDate = ({
  locale = "pt-BR",
  timeZone = "America/Sao_Paulo",
  format = "DD/MM/YYYY",
}) => {
  const date = new Date().toLocaleDateString(locale, {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (format === "YYYY-MM-DD") {
    return date.split("/").reverse().join("-");
  } else if (format === "MM/DD/YYYY") {
    const [day, month, year] = date.split("/");
    return `${month}/${day}/${year}`;
  }

  // Padrão DD/MM/YYYY
  return date;
};
