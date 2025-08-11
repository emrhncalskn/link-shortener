import { Statistic } from "@/types/statistic.type";
import { Link, UserCheck } from "lucide-react";

export const STATISTICS: Statistic[] = [
  {
    icon: UserCheck,
    number: "1500+",
    label: "Kullanıcı Sayısı",
  },
  {
    icon: Link,
    number: "100.000+",
    label: "Oluşturulan Link",
  },
];
