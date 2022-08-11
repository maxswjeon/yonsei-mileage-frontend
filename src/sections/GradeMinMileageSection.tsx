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
import { useStore } from "../store";

interface CourseInfoSectionProps {
  data: CourseData[];
}

const GradeMinMileageSection: React.FC<CourseInfoSectionProps> = (props) => {
  const { data } = props;

  const store = useStore();

  return (
    <Section>
      <Heading as="h2" size="md">
        학년별 최저 마일리지 정보
      </Heading>
      <Text fontSize="xs" color="gray.500">
        강조된 부분은 학생 정보를 반영한 정보입니다
      </Text>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">학년</Th>
              {data.map((d) => (
                <Th key={d.course._id} textAlign="center">
                  {d.course.HYHG}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array.from(
              Array(Math.max(...data.map((d) => d.min_by_grade.length))).keys()
            ).map((index) => (
              <Tr key={index}>
                <Th
                  textAlign="center"
                  bgColor={index + 1 === store.grade ? "gray.100" : undefined}
                >
                  {index + 1}
                </Th>
                {data.map((d) => {
                  if (
                    index >= d.min_by_grade.length ||
                    d.min_by_grade[index] === -1
                  ) {
                    return (
                      <Td key={d.course._id} textAlign="center">
                        -
                      </Td>
                    );
                  } else {
                    return (
                      <Td
                        key={d.course._id}
                        textAlign="center"
                        bgColor={
                          index + 1 === store.grade ? "gray.100" : undefined
                        }
                      >
                        {d.min_by_grade[index]}
                      </Td>
                    );
                  }
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Section>
  );
};
export default GradeMinMileageSection;
