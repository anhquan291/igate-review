export interface FileFields {

    formData: {
        participantName: string;
        identityNumber: string;
        profileNumber: string;
    },
    ratingOfficer: {
        id: string,
        name: [
            {
                languageId: number;
                name: string;
            }
        ],
        agency: {
            id: string;
        },
        userGroup: [
            {
                id: string;
                name: [
                    {
                        languageId: number;
                        name: string;
                    }
                ]
            }
        ],
        startDate: string;
        endDate: string;
    },
    officer: {
        id: string;
        name: string;
    },
    detail: [
        {
            answer: [
                {
                    id: string;
                    content: string;
                    replyType: number;
                    answerType: number;
                    point: number;
                    status: number;
                    chosen: number;
                },
                {
                    id: string;
                    content: string;
                    replyType: number;
                    answerType: number;
                    point: number;
                    status: number;
                    chosen: number;
                },
                {
                    id: string;
                    content: string;
                    replyType: number;
                    answerType: number;
                    point: number;
                    status: number;
                    chosen: number;
                },
                {
                    id: string;
                    content: string;
                    replyType: number;
                    answerType: number;
                    point: number;
                    status: number;
                    chosen: number;
                }
            ],
            status: number;
            question: {
                id: string;
                content: string;
                multipleChoice: number;
                requiredChoice: number;
                status: number;
                position: number;
            }
        }
    ],
    deploymentId: string;
}
