export interface FileFields {
  id: string;
  code: string;
  dossierStatus: {
    id: 2;
    name: string;
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
      phoneNumber: string;
      village: {
        label: string;
        value: string;
      };
      email: string;
      identityNumber: string;
    };
  };
  procedure: {
    id: string;
    code: string;
    translate: {
      languageId: number;
      name: string;
    };
    sector: {
      id: string;
      code: string;
    };
  };
  procedureProcessDefinition: {
    id: string;
    processDefinition: {
      id: string;
      processingTime: number;
      processingTimeUnit: string;
      timesheet: {
        id: string;
        name: string;
      };
      applicantEForm: {
        id: string;
        name: string;
      };
      eForm: {
        id: string;
      };
    };
  };
  agency: {
    id: string;
    name: string;
    code: string;
  };
  dossierProgress: number;
  appliedDate: string;
  appointmentDate: string;
  dueDate: string;
  acceptedDate: string;
  processingTime: number;
  processingTimeUnit: string;
  task: [
    {
      id: string;
      assignee: {
        id: string;
        fullname: string;
        account: {
          id: string;
          username: [
            {
              value: string;
            },
          ];
        };
      };
      candidateGroup: [
        {
          id: string;
          code: string;
          name: [
            {
              languageId: number;
              name: string;
            },
          ];
          parent: {
            id: string;
            name: [
              {
                languageId: number;
                name: string;
              },
              {
                languageId: number;
                name: string;
              },
            ];
            tag: [
              {
                id: string;
                name: [
                  {
                    languageId: number;
                    name: string;
                  },
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
                  {
                    languageId: number;
                    name: string;
                  },
                ];
              },
            ];
          };
          tag: [
            {
              id: string;
              name: [
                {
                  languageId: number;
                  name: string;
                },
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
                {
                  languageId: number;
                  name: string;
                },
              ];
            },
          ];
        },
      ];
      processDefinition: {
        id: string;
      };
      agency: {
        id: string;
        code: string;
        name: [
          {
            languageId: number;
            name: string;
          },
        ];
        parent: {
          id: string;
          name: [
            {
              languageId: number;
              name: string;
            },
            {
              languageId: number;
              name: string;
            },
          ];
          tag: [
            {
              id: string;
              name: [
                {
                  languageId: number;
                  name: string;
                },
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
                {
                  languageId: number;
                  name: string;
                },
              ];
            },
          ];
        };
        tag: [
          {
            id: string;
            name: [
              {
                languageId: number;
                name: string;
              },
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
              {
                languageId: number;
                name: string;
              },
            ];
          },
        ];
      };
      isCurrent: number;
      createdDate: string;
      updatedDate: string;
      activitiTask: {
        id: string;
        status: string;
      };
      bpmProcessDefinitionTask: {
        id: string;
        name: {
          id: string;
          name: string;
        };
        remind: {
          id: string;
          name: string;
        };
        variable: {
          canPaused: number;
          canPrintDossiersCostReport: number;
          canUploadResult: number;
          canIncreaseDue: number;
          canUseDigitalSign: number;
          canUpdateDossierComp: number;
          canUpdateApplicant: number;
          canCancelDosssier: number;
          canChoiceNextStep: number;
          canUpdateDosssierDetail: number;
          canResendDossierToPriviousStep: number;
          canDeleteDossier: number;
          canPrintReceiptTicket: number;
          canEvictDossier: number;
          canUseDigitalSignSmartCA: number;
          mustRatingOfficials: number;
          mustPublishInvoice: number;
          mustChooseAssignee: number;
          mustSendSMSToApplicant: number;
          mustAttachResultsFile: number;
          mustConfirm: number;
          processComments: string;
          officerSMSTemplate: {
            id: string;
            name: string;
            templateId: string;
            defaultSend: boolean;
          };
          officerZaloTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
          officerEmailTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
          citizenSMSTemplate: {
            id: string;
            name: string;
            templateId: string;
            defaultSend: boolean;
          };
          citizenZaloTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
          citizenEmailTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
        };
        definitionTask: {
          definitionKey: string;
          name: string;
        };
        processingTime: number;
        processingTimeUnit: string;
        dynamicVariable: {
          canEvictDossier: number;
          canConfirmDossierPaper: number;
          canUseDigitalSignSmartCA: number;
          canUseDigitalSignVGCA: number;
          canUseDigitalSignVNPTCA: number;
          canUseDigitalSignVNPTSim: number;
        };
      };
    },
  ];
  currentTask: [
    {
      id: string;
      assignee: {
        id: string;
        fullname: string;
        account: {
          id: string;
          username: [
            {
              value: string;
            },
          ];
        };
      };
      candidateGroup: [
        {
          id: string;
          code: string;
          name: [
            {
              languageId: number;
              name: string;
            },
          ];
          parent: {
            id: string;
            name: [
              {
                languageId: number;
                name: string;
              },
              {
                languageId: number;
                name: string;
              },
            ];
            tag: [
              {
                id: string;
                name: [
                  {
                    languageId: number;
                    name: string;
                  },
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
                  {
                    languageId: number;
                    name: string;
                  },
                ];
              },
            ];
          };
          tag: [
            {
              id: string;
              name: [
                {
                  languageId: number;
                  name: string;
                },
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
                {
                  languageId: number;
                  name: string;
                },
              ];
            },
          ];
        },
      ];
      processDefinition: {
        id: string;
      };
      agency: {
        id: string;
        code: string;
        name: [
          {
            languageId: number;
            name: string;
          },
        ];
        parent: {
          id: string;
          name: [
            {
              languageId: number;
              name: string;
            },
            {
              languageId: number;
              name: string;
            },
          ];
          tag: [
            {
              id: string;
              name: [
                {
                  languageId: number;
                  name: string;
                },
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
                {
                  languageId: number;
                  name: string;
                },
              ];
            },
          ];
        };
        tag: [
          {
            id: string;
            name: [
              {
                languageId: number;
                name: string;
              },
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
              {
                languageId: number;
                name: string;
              },
            ];
          },
        ];
      };
      isCurrent: number;
      createdDate: string;
      updatedDate: string;
      activitiTask: {
        id: string;
        status: string;
      };
      bpmProcessDefinitionTask: {
        id: string;
        name: {
          id: string;
          name: string;
        };
        remind: {
          id: string;
          name: string;
        };
        variable: {
          canPaused: number;
          canPrintDossiersCostReport: number;
          canUploadResult: number;
          canIncreaseDue: number;
          canUseDigitalSign: number;
          canUpdateDossierComp: number;
          canUpdateApplicant: number;
          canCancelDosssier: number;
          canChoiceNextStep: number;
          canUpdateDosssierDetail: number;
          canResendDossierToPriviousStep: number;
          canDeleteDossier: number;
          canPrintReceiptTicket: number;
          canEvictDossier: number;
          canUseDigitalSignSmartCA: number;
          mustRatingOfficials: number;
          mustPublishInvoice: number;
          mustChooseAssignee: number;
          mustSendSMSToApplicant: number;
          mustAttachResultsFile: number;
          mustConfirm: number;
          processComments: string;
          officerSMSTemplate: {
            id: string;
            name: string;
            templateId: string;
            defaultSend: boolean;
          };
          officerZaloTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
          officerEmailTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
          citizenSMSTemplate: {
            id: string;
            name: string;
            templateId: string;
            defaultSend: boolean;
          };
          citizenZaloTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
          citizenEmailTemplate: {
            id: string;
            name: string;
            defaultSend: boolean;
          };
        };
        definitionTask: {
          definitionKey: string;
          name: string;
        };
        processingTime: number;
        processingTimeUnit: string;
        dynamicVariable: {
          canEvictDossier: number;
          canConfirmDossierPaper: number;
          canUseDigitalSignSmartCA: number;
          canUseDigitalSignVGCA: number;
          canUseDigitalSignVNPTCA: number;
          canUseDigitalSignVNPTSim: number;
        };
      };
    },
  ];
  applyMethod: {
    id: number;
    name: string;
  };
  dossierTaskStatus: {
    id: string;
    name: string;
  };
  undefindedCompleteTime: number;
  countDutypaidCert: number;
}
