import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstructionsComponent } from "./instructions/instructions.component";
import { TestInstructionsComponent } from './instructions/test-instructions/test-instructions.component';
import { TestComponent } from "./test/test.component";
import { objNgFor } from "./test/test.pipe";

const routes: Routes = [
    { path: "", component: InstructionsComponent },
    { path: "test", component: TestComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class AppRoutingModule { }

export const RoutedComponents = [
    InstructionsComponent,
    TestComponent,
    TestInstructionsComponent,
    objNgFor
];