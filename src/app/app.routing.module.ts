import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstructionsComponent } from "./instructions/instructions.component";
import { TestComponent } from "./test/test.component";

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
    ]
})

export class AppRoutingModule { }

export const RoutedComponents = [
    InstructionsComponent,
    TestComponent
];