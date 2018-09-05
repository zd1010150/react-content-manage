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

export const formatRelatedTos = (data, type) => {
  if (!data || !_.isArray(data) || !type) return [];

  const filteredData = data.filter(rt => rt.taskable_type === type);
  return filteredData.map(rt => ({
    id: `${rt.taskable_type}__${rt.taskable_id}`,
    type: rt.taskable_type,
    name: rt.name,
  }));
};
