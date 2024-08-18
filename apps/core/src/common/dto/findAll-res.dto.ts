import { Like } from "typeorm"

export const FindAllResDtoBuilder = (objectClass) => {
   class FindAllResDto extends objectClass {

   }

   return new FindAllResDto()
}



