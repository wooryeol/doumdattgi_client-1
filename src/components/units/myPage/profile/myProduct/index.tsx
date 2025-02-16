import * as S from "./styles";
import { useQueryFetchMyProduct } from "../../../../commons/hooks/queries/useQueryfetchMyProduct";
import { useMoveToPage } from "../../../../commons/hooks/custom/useMoveToPage/index";
import { CategoryObj, Obj } from "../../../../../commons/libraries/translate";
import { fallback } from "../../../../../commons/libraries/fallback";
import Tag from "../../../../commons/tag";

export default function ProfileMyProduct(): JSX.Element {
  const { data: myProduct, fetchMore } = useQueryFetchMyProduct();

  const { onClickMoveToPage } = useMoveToPage();

  // 무한 스크롤 로직
  const onLoadMore = () => {
    if (myProduct === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((myProduct?.fetchMyProduct.length ?? 5) / 5) + 1
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchMyProduct === undefined) {
          return { fetchMyProduct: [...prev.fetchMyProduct] };
        }

        return {
          fetchMyProduct: [
            ...prev.fetchMyProduct,
            ...fetchMoreResult.fetchMyProduct
          ]
        };
      }
    });
  };

  return (
    <S.Wrapper>
      <S.WrapperRight
        loadMore={onLoadMore}
        pageStart={0}
        hasMore={true}
        useWindow={false}
      >
        {myProduct?.fetchMyProduct[0] === undefined ? (
          <S.None>아직 게시물이 없습니당</S.None>
        ) : (
          <>
            {myProduct?.fetchMyProduct.map(el => (
              <S.RightListBox onClick={onClickMoveToPage(`/${el.product_id}`)}>
                <S.ListImage
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.src = fallback;
                  }}
                  src={
                    el.images === undefined || el.images === null
                      ? ""
                      : el.images[0].image_url
                  }
                />
                <S.RightDetailBox>
                  <S.ListCategory>
                    {CategoryObj[el.product_category]}
                  </S.ListCategory>
                  <S.ListTitle>{el.product_title}</S.ListTitle>
                  <Tag data={el.product_workDay} />
                  <S.DivideLine />
                  <S.Remarks>{el.product_summary}</S.Remarks>
                </S.RightDetailBox>
              </S.RightListBox>
            ))}
          </>
        )}
      </S.WrapperRight>
    </S.Wrapper>
  );
}
