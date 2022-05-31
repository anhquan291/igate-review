export interface QuestionFields {
  id: string;
  name: [
    {
      languageId: number;
      name: string;
    },
  ];
  agency: [
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
  ];
  startDate: string;
  endDate: string;
  userGroup: [
    {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    },
  ];
  questionGroup: [
    {
      name: string;
      description: string;
      question: [
        {
          sort(
            arg0: (
              a: { answerType: number },
              b: { answerType: number },
            ) => number,
          ): any;
          id: string;
          content: string;
          multipleChoice: number;
          requiredChoice: number;
          answer: [
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
          ];
          status: number;
        },
        {
          id: string;
          content: string;
          multipleChoice: number;
          requiredChoice: number;
          answer: [
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
            {
              id: string;
              content: string;
              replyType: number;
              answerType: number;
              point: number;
              status: number;
            },
          ];
          status: number;
        },
      ];
    },
  ];
  dossierUnique: number;
  status: number;
  deploymentId: string;
  createdDate: string;
  updatedDate: string;
  pageable: {
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
