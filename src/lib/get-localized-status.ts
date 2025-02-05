import { ApplicationStatus } from './store/types';

const getLocalizedStatus = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.Draft: {
      return 'Черновик';
    }

    case ApplicationStatus.Accepted: {
      return 'Принята';
    }

    case ApplicationStatus.Canceled: {
      return 'Отменена';
    }

    case ApplicationStatus.InProgress: {
      return 'На рассмотрении';
    }

    case ApplicationStatus.Rejected: {
      return 'Отклонена';
    }

    default: {
      return '';
    }
  }
};

export default getLocalizedStatus;
