export interface Exam {
    id?: number;
    name: string;
    exam_date?: string;
    exam_time?: string;
    opening_date?: string;
    opening_time?: string;
    closing_date?: string;
    closing_time?: string;
    exam_levels?: string[];
}

export const fetchExams = async (): Promise<Exam[]> => {
    try {
        const response = await fetch('/api/getExams');
        const result = await response.json();
        if (result.success) {
            return result.data.map((exam: Exam) => ({
                ...exam,
                exam_date: exam.exam_date || '-',
                exam_time: exam.exam_time || '-',
                opening_date: exam.opening_date || '-',
                opening_time: exam.opening_time ? exam.opening_time.trim() : '-',
                closing_date: exam.closing_date || '-',
                closing_time: exam.closing_time ? exam.closing_time.trim() : '-',
            }));
        } else {
            console.error('Failed to fetch exams');
            return [];
        }
    } catch (error) {
        console.error('Error fetching exams:', error);
        return [];
    }
};

export const deleteExam = async (id: number) => {
    const response = await fetch(`/api/deleteExam?id=${id}`, {
        method: 'DELETE',
    });
    return response.json();
};