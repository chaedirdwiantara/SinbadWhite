export const questions = [
  {
    surveyId: 1,
    title: 'Apakah di toko anda terdapat promosi?',
    required: true,
    order: 1,
    totalScore: 25,
    surveySubType: {
      id: 1,
      title: 'Pilihan ganda',
      code: 'multiple_choice'
    },
    surveyQuestionCategory: {
      id: 1,
      code: 'single_answer'
    },
    surveyScoreType: {
      id: 1,
      code: 'single_score'
    },
    surveyCandidateAnswer: [
      {
        id: 5,
        title: 'Ya',
        order: 1,
        score: 20,
        inputValue: 'checked'
      },
      {
        id: 6,
        title: 'Tidak',
        order: 2,
        score: 10
      }
    ]
  },
  {
    surveyId: 2,
    title: 'Apakah promo dibawah ini dijalankan?',
    required: true,
    order: 2,
    totalScore: 25,
    surveySubType: {
      id: 1,
      title: 'Pilihan ganda',
      code: 'multiple_choice'
    },
    surveyQuestionCategory: {
      id: 2,
      code: 'multiple_answer'
    },
    surveyScoreType: {
      id: 1,
      code: 'single_score'
    },
    surveyCandidateAnswer: [
      {
        id: 7,
        title: 'Promo Free Produk',
        order: 1,
        score: 20
      },
      {
        id: 8,
        title: 'Promo buy 1 get 1',
        order: 2,
        score: 10,
        inputValue: 'checked'
      },
      {
        id: 9,
        title: 'Promo buy 2 get 1',
        order: 4,
        score: 20,
        inputValue: 'checked'
      },
      {
        id: 10,
        title: 'Promo Diskon',
        order: 3,
        score: 10,
        inputValue: 'checked'
      }
    ]
  },
  {
    surveyId: 3,
    title: 'Apakah toko menjual varian produk SGM berikut?',
    required: true,
    order: 3,
    totalScore: 25,
    surveySubType: {
      id: 1,
      title: 'Pilihan ganda',
      code: 'multiple_choice'
    },
    surveyQuestionCategory: {
      id: 2,
      code: 'multiple_answer'
    },
    surveyScoreType: {
      id: 2,
      code: 'cumulative_score'
    },
    surveyCandidateAnswer: [
      {
        id: 11,
        title: 'SGM Ananda 1',
        order: 1,
        score: 20,
        inputValue: 'checked'
      },
      {
        id: 12,
        title: 'SGM Ananda 2',
        order: 2,
        score: 10,
        inputValue: 'checked'
      },
      {
        id: 13,
        title: 'SGM 0-6',
        order: 4,
        score: 20,
        inputValue: 'checked'
      },
      {
        id: 14,
        title: 'SGM Soya',
        order: 3,
        score: 10
      }
    ]
  },
  {
    surveyId: 4,
    title: 'Berapa jumlah produk SGM dibandingkan dengan Total produk susu?',
    required: true,
    order: 4,
    totalScore: 25,
    surveySubType: {
      id: 2,
      title: 'Komparasi Nilai',
      code: 'value_compare'
    },
    surveyQuestionCategory: {
      id: 3,
      code: 'vc_basic'
    },
    surveyScoreType: {
      id: 3,
      code: 'range_score'
    },
    surveyCandidateAnswer: [
      {
        id: 15,
        title: 'SGM',
        order: 1,
        score: 75
      },
      {
        id: 16,
        title: 'Total Produk Susu',
        order: 2,
        score: 90
      }
    ]
  },
  {
    surveyId: 5,
    title: 'Berapa jumlah produk SGM dibandingkan dengan Total produk susu?',
    order: 5,
    totalScore: 25,
    surveySubType: {
      id: 2,
      title: 'Komparasi Nilai',
      code: 'value_compare'
    },
    surveyQuestionCategory: {
      id: 4,
      code: 'vc_compare_group'
    },
    surveyScoreType: {
      id: 3,
      code: 'range_score'
    },
    surveyCandidateAnswer: [
      {
        id: 17,
        title: 'SGM',
        order: 1,
        score: 75,
        isBaseValue: true
      },
      {
        id: 18,
        title: 'Dancow',
        order: 2,
        score: 16
      },
      {
        id: 19,
        title: 'Frisian Flag',
        order: 3,
        score: 20
      },
      {
        id: 14,
        title: 'Lainnya',
        order: 4,
        score: 4
      }
    ]
  }
];
