export interface FileFields {
  id: string;
  code: string;
  dossierStatus: {
    id: number;
    name: string;
    comment: string;
  };
  applicant: {
    eformId: string;
    userId: string;
    data: {
      fullname: string;
      identityDate: string;
      birthday: string;
      province: {
        label: string;
        value: string;
      };
      address: string;
      organization: string;
      identityAgency: {
        id: string;
        tag: [
          {
            id: string;
          },
        ];
        name: string;
      };
      gender: number;
      district: {
        label: string;
        value: string;
      };
      fax: string;
      nation: {
        label: string;
        value: string;
      };
      phoneNumber: number;
      village: {
        label: string;
        value: string;
      };
      email: string;
      identityNumber: number;
    };
  };
  procedure: {
    id: string;
    code: string;
    translate: [
      {
        languageId: number;
        name: string;
      },
    ];
    sector: {
      id: string;
      name: [
        {
          languageId: number;
          name: string;
        },
      ];
    };
  };
  agency: {
    id: string;
    name: string;
    code: string;
  };
  applyMethod: {
    id: number;
    name: string;
  };
  appliedDate: string;
  acceptedDate: string;
  appointmentDate: string;
  statusCurrentTask: string;
  dossierTaskStatus: {
    id: string;
    name: string;
  };
  undefindedCompleteTime: number;
}
