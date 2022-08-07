import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CourseMileageInfo } from "../models/courseMileageInfo";

interface MinMileageProps {
  data: CourseMileageInfo[];
}

const MinMileage: React.FC<MinMileageProps> = (props) => {
  const { data } = props;

  return (
    <>
      <Heading as="h3" size="md" mt="3">
        최저 마일리지
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {data.map((d) => (
                <Th key={d.hyhg} textAlign="center">
                  {d.hyhg}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {data.map((d) => (
                <Td key={d.hyhg} textAlign="center">
                  {Number(d.min) === -1 ? "N/A" : d.min}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MinMileage;
