import { EnumStatus } from "@/types/deals.types";
import type { IColumn } from "./kanban.types";

export const KANBAN_DATA:IColumn[] = [
   {
      id: EnumStatus.todo,
      name: 'Отримані',
      items: []
   },
   {
      id: EnumStatus['to-be-agreed'],
      name: 'На узгодженні',
      items: []
   },
   {
      id: EnumStatus['in-process'],
      name: 'На виконанні',
      items: []
   },
   {
      id: EnumStatus.produced,
      name: 'Виконанні',
      items: []
   },
   {
      id: EnumStatus.done,
      name: 'Завершені',
      items: []
   },
]