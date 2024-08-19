import { Module } from "@nestjs/common";
import { BookModule } from "./book/book.module";
import { BookVersionModule } from "./bookVersion/book.module";
import { CartModule } from "./cart/cart.module";


@Module({
    imports: [
        BookModule,
        BookVersionModule,
        CartModule,
    ]
})
export class PackageModule { }
