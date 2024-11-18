export default function getStudentIdsSum(students) {
  const sum_id = students.reduce((accumulator, students) => accumulator + students.id, 0);
  return sum_id;
}
