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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CourseMileageInfo } from "../models/courseMileageInfo";

interface MileageDataProps {
  data: CourseMileageInfo[];
}

const MileageData: React.FC<MileageDataProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Heading as="h3" size="md" mt="3">
        마일리지 경쟁 정보
      </Heading>
      <Tabs>
        <TabList>
          {data.map((d) => (
            <Tab key={d.hyhg}>{d.hyhg}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((d) => (
            <TabPanel key={d.hyhg} p="0">
              <TableContainer>
                <Table variant="simple" overflow="auto">
                  <Thead>
                    <Th textAlign="center">순위</Th>
                    <Th textAlign="center">마일리지</Th>
                    <Th textAlign="center">전공자 여부</Th>
                    <Th textAlign="center">신청과목수</Th>
                    <Th textAlign="center">졸업신청</Th>
                    <Th textAlign="center">초수강 여부</Th>
                    <Th textAlign="center">총 이수학점 비율</Th>
                    <Th textAlign="center">직전학기 이수학점 비율</Th>
                    <Th textAlign="center">학년</Th>
                  </Thead>
                  <Tbody>
                    {d.data.map((d2) => (
                      <Tr
                        key={d2.join(",")}
                        color={d2[9] === "O" ? "green.600" : "red.700"}
                      >
                        <Td textAlign="center">{d2[0]}</Td>
                        <Td textAlign="center">{d2[1]}</Td>
                        <Td textAlign="center">{d2[2]}</Td>
                        <Td textAlign="center">{d2[3]}</Td>
                        <Td textAlign="center">{d2[4]}</Td>
                        <Td textAlign="center">{d2[5]}</Td>
                        <Td textAlign="center">{d2[6]}</Td>
                        <Td textAlign="center">{d2[7]}</Td>
                        <Td textAlign="center">{d2[8]}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MileageData;
