import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Section from "../components/Section";
import { CourseData } from "../models/CourseData";

interface CourseInfoSectionProps {
  data: CourseData[];
}

const MinMileageSection: React.FC<CourseInfoSectionProps> = (props) => (
  <Section>
    <Heading as="h2" size="md">
      최저 마일리지 정보
    </Heading>
    <Text fontSize="xs" color="gray.500">
      최저 마일리지 정보는 학생 정보를 반영하지 않은 정보입니다
    </Text>
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {props.data.map((d) => (
              <Th key={d.course._id} textAlign="center">
                {d.course.HYHG}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {props.data.map((d) => (
              <Td key={d.course._id} textAlign="center">
                {d.min}
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  </Section>
);

export default MinMileageSection;
