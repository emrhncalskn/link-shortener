import { Copy, Link, Loader2 } from "lucide-react";

export const FEATURES = [
  {
    icon: Link,
    title: "Hızlı Kısaltma",
    description: "Linklerinizi anında kısaltın ve paylaşın",
  },
  {
    icon: Copy,
    title: "Kolay Kopyalama",
    description: "Tek tıkla panoya kopyalayın",
  },
  {
    icon: Loader2,
    title: "Güvenli",
    description: "Linkleriniz güvenli şekilde saklanır",
  },
] as const;
