"use client";

// import { store } from "@/redux/store";
// import { Provider } from "react-redux";

interface ProvidersProps {
    children: React.ReactNode;
}

// export default function Providers({ children }: ProvidersProps) {
//     return <Provider store={store}>{children}</Provider>;
// }
export default function Providers({ children }: ProvidersProps) {
    return <>{children}</>;
}
