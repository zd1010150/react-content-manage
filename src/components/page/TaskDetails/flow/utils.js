import { toUtc } from 'utils/dateTimeUtils';

export const mapToApi = ({
  assigneeId,
  comments,
  dueTime,
  priorityCode,
  statusCode,
  subject,
}) => ({
  assign_to_user_id: assigneeId,
  subject,
  status_code: statusCode,
  priority_code: priorityCode,
  due_date: toUtc(dueTime),
  comments,
});
