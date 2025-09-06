import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          pageTitle: "Driver Table",
          table: {
            headerName: "Name",
            headerStatus: "Status",
            headerLocation: "Location",
            headerLastActive: "Last Active",
          },
          filters: {
            status: "Driver Status",
            location: "Driver Location",
            dateRange: "Date Range",
          },
          export: {
            csv: "Export as CSV",
            excel: "Export as Excel",
            pdf: "Export as PDF",
            quickbooks: "Export as QuickBooks JSON",
            fmcsa: "Export as FMCSA PDF",
          },
          back: "Back",
        },
      },
      fr: {
        translation: {
          pageTitle: "Tableau des conducteurs",
          table: {
            headerName: "Nom",
            headerStatus: "Statut",
            headerLocation: "Emplacement",
            headerLastActive: "Dernière activité",
          },
          filters: {
            status: "Statut du conducteur",
            location: "Emplacement du conducteur",
            dateRange: "Plage de dates",
          },
          export: {
            csv: "Exporter en CSV",
            excel: "Exporter en Excel",
            pdf: "Exporter en PDF",
            quickbooks: "Exporter en QuickBooks (JSON)",
            fmcsa: "Exporter en FMCSA (PDF)",
          },
          back: "Retour",
        },
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
