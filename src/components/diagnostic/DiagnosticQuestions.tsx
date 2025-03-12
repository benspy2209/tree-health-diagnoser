
import { useLanguage } from "@/i18n/LanguageContext";

export interface DiagnosticQuestionType {
  question: string;
  subtitle?: string;
  options: string[];
  multiSelect?: boolean;
}

export const DiagnosticQuestions = (): DiagnosticQuestionType[] => {
  const { t, language } = useLanguage();

  // Chaque question est maintenant construite à partir des traductions
  return [
    {
      question: t("diagnostic.location.question"),
      subtitle: t("diagnostic.location.subtitle"),
      options: [
        t("diagnostic.location.options.nearBuilding"),
        t("diagnostic.location.options.nearRoad"),
        t("diagnostic.location.options.isolated"),
        t("diagnostic.location.options.unknown")
      ]
    },
    {
      question: t("diagnostic.signs.question"),
      subtitle: t("diagnostic.signs.subtitle"),
      options: [
        t("diagnostic.signs.options.yes"),
        t("diagnostic.signs.options.no"),
        t("diagnostic.signs.options.unknown")
      ]
    },
    {
      question: t("diagnostic.problems.question"),
      subtitle: t("diagnostic.problems.subtitle"),
      multiSelect: true,
      options: [
        t("diagnostic.problems.options.discoloredLeaves"),
        t("diagnostic.problems.options.deadBranches"),
        t("diagnostic.problems.options.fungi"),
        t("diagnostic.problems.options.cracks"),
        t("diagnostic.problems.options.cavities"),
        t("diagnostic.problems.options.leaning"),
        t("diagnostic.problems.options.other")
      ]
    },
    {
      question: t("diagnostic.duration.question"),
      subtitle: t("diagnostic.duration.subtitle"),
      options: [
        t("diagnostic.duration.options.lessThanWeek"),
        t("diagnostic.duration.options.oneToFourWeeks"),
        t("diagnostic.duration.options.oneToSixMonths"),
        t("diagnostic.duration.options.moreThanSixMonths"),
        t("diagnostic.duration.options.unknown")
      ]
    }
  ];
};
