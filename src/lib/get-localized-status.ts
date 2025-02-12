import { ApplicationStatus } from './store/types';

const getLocalizedStatus = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.Draft: {
      return 'Черновик';
    }

    case ApplicationStatus.Accepted: {
      return 'Заявка принята';
    }

    case ApplicationStatus.Canceled: {
      return 'Заявка отменена';
    }

    case ApplicationStatus.InProgress: {
      return 'На рассмотрении';
    }

    case ApplicationStatus.Rejected: {
      return 'Заявка отклонена';
    }

    default: {
      return '';
    }
  }
};

export default getLocalizedStatus;
