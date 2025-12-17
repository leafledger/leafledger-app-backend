import { IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class CatalogDto {
    @IsOptional()
    @IsString()
    @Matches(/[a-zA-Z,:]{1,}/, {
        message: "sort only contains letter, colon and comma"
    })
    sort: string;
    
    @IsOptional()
    @IsNumber()
    page_no?: number;
    
    @IsOptional()
    @IsNumber()
    page_size?: number;
    
    @IsOptional()
    @IsString()
    @Matches(/[0-9a-zA-Z,:]{1,}/, {
        message: "filter only contains letter, colon and comma or some inputs"
    })
    filter: string;
}