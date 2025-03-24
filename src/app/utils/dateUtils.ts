export const formatDate = (date: string) => {
    if (!date) return '-';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return '-';
    return parsedDate.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatTime = (time: string) => {
    if (!time) return '-';
    const trimmedTime = time.trim();
    const timeWithoutSeconds = trimmedTime.split(':').slice(0, 2).join(':');
    const parsedTime = new Date(`1970-01-01T${timeWithoutSeconds}:00`);
    if (isNaN(parsedTime.getTime())) return '-';
    return parsedTime.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatExamTime = (time: string): string => {
    if (!time) return '';
    return time;
};