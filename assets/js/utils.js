
function today() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}


function getPriorityIconFromNumber(priority) {
  switch (priority) {
    case 1:
      return 'critical';
    case 2:
      return 'high';
    case 3:
      return 'medium';
    case 4:
      return 'low';
    case 5:
      return 'minor';
    default:
      return 'minor';
  }
}

