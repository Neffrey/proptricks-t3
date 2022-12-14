// LIBRARIES
import { FC } from "react";
import { FaCheck, FaPenSquare, FaWindowClose } from "react-icons/fa";

// COMPONENTS
import monthNumberToName from "components/helpers/monthNumberToName";
import dateToHoursMinutesAMPM from "components/helpers/dateToHoursMinutesAMPM";

// TYPES
interface TableColumn {
  title: string;
  accessor: string;
  type?: string | undefined; // "boolean" | "date" | "text" | undefined;
  isSortable?: boolean | undefined;
  gridSpan?: number | undefined;
  justify?: string | undefined; // "start" | "center" | "end" | undefined;
  textSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | undefined;
}

interface TableData {
  [x: string]: string | number | Date | boolean | null | undefined;
}

interface SortableTableProps {
  columns: TableColumn[];
  data: TableData[];
  editMutation?: any | undefined;
  deleteMutation?: any | undefined;
}

// FC
const SortableTable: FC<SortableTableProps> = ({
  columns,
  data,
  editMutation,
  deleteMutation,
}) => {
  // STORE

  // HELPERS
  const countTableColumns = () => {
    let count = 0;
    columns.forEach((column) => {
      if (column.gridSpan) count += column.gridSpan;
      else count++;
    });
    return count;
  };
  const getColumnData = (
    currentData: TableData,
    accessor: string,
    type: string
  ) => {
    switch (type) {
      case "text":
        if (currentData[accessor]) return currentData[accessor];
        else return "";
      case "date":
        if (currentData[accessor]) {
          const newData = currentData[accessor] as Date;
          return `${monthNumberToName(newData.getMonth())} ${newData.getDate()}
          ${dateToHoursMinutesAMPM(newData)}`;
        } else return "——";
      case "boolean":
        return currentData[accessor] ? <FaCheck /> : "";
      case "delete":
        return (
          <div
            className="flex cursor-pointer text-xl text-error/70 hover:text-error"
            onClick={() =>
              deleteMutation?.mutate ? deleteMutation.mutate({
                id: currentData.id,
              }) : console.log("deleteMutation not defined")
            }
          >
            <FaWindowClose />
          </div>
        );
      // TODO: Add edit button
      // case "edit":
      //   const handleEditUser = (user: User) => {
      //     setUserId(user?.id ? user.id : "");
      //     setNameInput(user?.name ? user.name : "");
      //     setEmailInput(user?.email ? user.email : "");
      //     setRoleInput(user?.role ? user.role : "");
      //     toggleIsModalOpen();
      //   };
      //   return (
      //     <div
      //       // Edit
      //       className="col-span-1 flex cursor-pointer justify-center text-xl text-warning/70 hover:text-warning"
      //       onClick={() => handleEditUser(user)}
      //     >
      //       <FaPenSquare />
      //     </div>
      //   );
      default:
        return `——`;
    }
  };

  return (
    <div
      // Table
      className="mt-20 grid w-full justify-center gap-4 align-middle"
      style={{
        gridTemplateColumns: `repeat(${countTableColumns()}, minmax(0, 1fr))`,
      }}
    >
      <>
        {
          // Table Head
          columns.map(({ title, accessor, gridSpan, textSize, justify }) => {
            return (
              <div
                key={`table-head-${accessor}`}
                className={
                  `flex grid-rows-1 text-${textSize ? textSize : "lg"}` +
                  ` justify-${justify ? justify : "start"}`
                }
                style={{
                  gridColumn: `span ${gridSpan ? gridSpan : 1}`,
                }}
              >
                {title}
              </div>
            );
          })
        }

        {
          //Table Body
          data.map((dataRow, rowIndex) => {
            return columns.map(
              ({ accessor, gridSpan, textSize, type, justify }) => {
                return (
                  <div
                    key={`table-body-${accessor}-${rowIndex}`}
                    className={
                      `flex items-center text-${textSize ? textSize : "lg"}` +
                      ` justify-${justify ? justify : "start"}`
                    }
                    style={{
                      gridColumn: `span ${gridSpan ? gridSpan : 1}`,
                    }}
                  >
                    {/* <button
                    className="m-2 h-full w-full"
                    onClick={() => console.log(data)}
                  >
                    Log CurrentData
                  </button> */}
                    <>
                      {getColumnData(dataRow, accessor, type ? type : "text")}
                    </>
                  </div>
                );
              }
            );
          })
        }
      </>
    </div>
  );
};

export default SortableTable;
