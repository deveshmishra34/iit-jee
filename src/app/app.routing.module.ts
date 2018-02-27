import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstructionsComponent } from "./pages/instructions/instructions.component";
import { TestInstructionsComponent } from './pages/instructions/test-instructions/test-instructions.component';
import { TestComponent } from "./pages/test/test.component";
import { LoginComponent } from "./pages/login/login.component";
import { TestAckComponent } from "./pages/testAck/testAck.component";
import { objNgFor } from "./pages/test/test.pipe";
import { AuthGuardService } from './shared/_guard/auth-guard.service';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "instructions", component: InstructionsComponent },
    { path: "test", component: TestComponent },
    { path: "submit", component: TestAckComponent },
    { path: "", redirectTo: 'instructions', pathMatch: 'full' },
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
    objNgFor,
    TestAckComponent,
    LoginComponent
];