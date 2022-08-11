import { Heading, Table, TableContainer, Td, Th, Tr } from "@chakra-ui/react";
import Section from "../components/Section";
import { Course } from "../models/course";

interface CourseInfoSectionProps {
  course: Course;
}

const CourseInfoSection: React.FC<CourseInfoSectionProps> = (props) => (
  <Section>
    <Heading as="h2" size="md">
      강의정보
    </Heading>
    <TableContainer>
      <Table>
        <Tr>
          <Th>교수명</Th>
          <Td>{props.course.PROF} 교수님</Td>
          <Th>구분</Th>
          <Td>{props.course.ocode1_title}</Td>
        </Tr>
      </Table>
    </TableContainer>
  </Section>
);

export default CourseInfoSection;
