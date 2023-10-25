import { toast } from "@/components/ui/use-toast";
import axios from "axios";

const deleteTrade = async (id: string) => {
    try {
        const res = await axios.delete(`/api/trades/${id}`);
        console.log(res)

        if (res.status === 200) {
            toast({
                title: "Trade deleted",
                description: "The trade was successfully deleted",
                variant: "success",
            });
        } else {
            toast({
                title: "Error",
                description: "An error occured while deleting the trade",
                variant: "destructive",
            });
        }
    } catch (err) {
        console.log(err);
        toast({
            title: "Error",
            description: "An error occured while deleting the trade",
            variant: "destructive",
        });
    }
}

export default deleteTrade;