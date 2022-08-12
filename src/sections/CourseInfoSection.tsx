import { Heading, Table, TableContainer, Td, Th, Tr } from "@chakra-ui/react";
import Section from "../components/Section";
import { Course } from "../models/course";
import { Everytime } from "../models/everytime";

interface CourseInfoSectionProps {
  course: Course;
  everytime: Everytime | null;
}

const CourseInfoSection: React.FC<CourseInfoSectionProps> = (props) => {
  const { course, everytime } = props;

  return (
    <Section>
      <Heading as="h2" size="md">
        강의정보
      </Heading>
      <TableContainer>
        <Table>
          <Tr>
            <Th>교수명</Th>
            <Td>{course.PROF} 교수님</Td>
            <Th>구분</Th>
            <Td>{course.ocode1_title}</Td>
          </Tr>
          <Tr>
            <Th>학점</Th>
            <Td>{everytime && everytime.credit}</Td>
            <Th>에브리타임 담은 인원</Th>
            <Td>{everytime && everytime.popular}</Td>
          </Tr>
          <Tr></Tr>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default CourseInfoSection;
