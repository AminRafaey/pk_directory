export const scrollByClassId = (id) => {
    const classId = document.getElementById(id);
    if (classId) {
        classId.scrollIntoView();
    }
}