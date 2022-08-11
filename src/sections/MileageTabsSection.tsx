import {
  Heading,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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

interface MileageTabsSectionProps {
  data: CourseData[];
}

interface MileageTabProps {
  data: CourseData;
}

const MilageTab: React.FC<MileageTabProps> = (props) => {
  const {
    data: { data: history, min, min_by_grade, course },
  } = props;

  const { grade } = useStore();

  const isGradeFiltered =
    course.CUT1 !== "0" ||
    course.CUT2 !== "0" ||
    course.CUT3 !== "0" ||
    course.CUT4 !== "0";

  const GradeFilter = isGradeFiltered ? (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">1학년</Th>
              <Th textAlign="center">2학년</Th>
              <Th textAlign="center">3학년</Th>
              <Th textAlign="center">4학년</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center">{course.CUT1}</Td>
              <Td textAlign="center">{course.CUT2}</Td>
              <Td textAlign="center">{course.CUT3}</Td>
              <Td textAlign="center">{course.CUT4}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  ) : null;

  return (
    <>
      <Text fontSize="xs" color="gray.500">
        {isGradeFiltered
          ? "해당 과목은 학년별 정원이 있는 과목으로, 학기별 최저 마일리지 정보는 학생과 동일한 학년의 정보만 표시합니다"
          : "해당 과목은 학년별 정원이 없는 과목으로, 학기별 최저 마일리지 정보는 모든 학년의 정보를 표시합니다"}
      </Text>
      {GradeFilter}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">순위</Th>
              <Th textAlign="center">마일리지</Th>
              <Th textAlign="center">전공자 여부</Th>
              <Th textAlign="center">신청 과목수</Th>
              <Th textAlign="center">졸업 신청 여부</Th>
              <Th textAlign="center">초수강 여부</Th>
              <Th textAlign="center">총 이수학점 비율</Th>
              <Th textAlign="center">직전 이수학점 비율</Th>
              <Th textAlign="center">학년</Th>
              <Th textAlign="center">수강여부</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history
              .filter((h) =>
                isGradeFiltered
                  ? h.grade == grade && h.mileage == min_by_grade[grade - 1]
                  : h.mileage == min
              )
              .map((h, i) => (
                <Tr key={i} color={h.isEnrolled ? "green.600" : "red.600"}>
                  <Td textAlign="center">{h.rank}</Td>
                  <Td textAlign="center">{h.mileage}</Td>
                  <Td textAlign="center">{h.isMajor ? "O" : "X"}</Td>
                  <Td textAlign="center">{h.subjectCount}</Td>
                  <Td textAlign="center">{h.isGraduate ? "O" : "X"}</Td>
                  <Td textAlign="center">{h.isFirst ? "O" : "X"}</Td>
                  <Td textAlign="center">{h.totalCreditRatio.toFixed(4)}</Td>
                  <Td textAlign="center">{h.lastCreditRatio.toFixed(4)}</Td>
                  <Td textAlign="center">{h.grade}</Td>
                  <Td textAlign="center">{h.isEnrolled ? "O" : "X"}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

const MileageTabsSection: React.FC<MileageTabsSectionProps> = (props) => {
  const { data } = props;
  return (
    <Section>
      <Heading as="h2" size="md">
        학기별 최저 마일리지 정보
      </Heading>
      <Tabs>
        <TabList>
          {data.map((d) => (
            <Tab key={d.course._id}>{d.course.HYHG}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((d) => (
            <TabPanel key={d.course._id}>
              <MilageTab data={d} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Section>
  );
};

export default MileageTabsSection;
