 import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateRoleBackendIdDto } from './create-role-backend.dto';
import { AbstractFindAllDto } from 'apps/core/src/common/dto/abstract.findAll.dto';
 
class FindRolesFilter extends PickType(CreateRoleBackendIdDto, ['backendId']) {}

export class FindRolesDto extends AbstractFindAllDto {
    @ApiPropertyOptional({ type: () => FindRolesFilter })
    @Type(() => FindRolesFilter)
    @ValidateNested()
    filter?: FindRolesFilter;
}

export class FindRolesResultDto {}
