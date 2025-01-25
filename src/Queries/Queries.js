import { gql } from "@apollo/client"

export const DASHBOARD = gql`
query NewQuery {
  pageBy(uri: "/my-account") {
   pageBuilder {
      pages {
        ... on PageBuilderPagesAccountLinksLayout {   
          sidemenu {
            link {
              title
              url
            }
          }
        }
}
}
}
}
`
export const GET_PAGE = gql`
query NewQuery($uri: String!) {
  pageBy(uri: $uri) {
    pageBuilder {
      pages {
      fieldGroupName
        ... on PageBuilderPagesContactFormLayout {
          description
           group {
            cardshead
            cardstext {
              text
            }
            image {
              node {
                altText
                title
                sourceUrl
              }
            }
          }
          title
          textareaPlaceholder
          submitButton
          forminput {
            type
            placeholder
          }
        }
    
        ... on PageBuilderPagesCardsLayout {
          fieldGroupName
          title
          card {
            paragraph
            text
            icon {
              node {
              title
                sourceUrl
                altText
              }
            }
          }
        }
              ... on PageBuilderPagesMapLayout {
          embeddedCode
          fieldGroupName
        }
         ... on PageBuilderPagesFormLayout {
          formLayout
          title
        }
          ... on PageBuilderPagesListItemsLayout {
          fieldGroupName
          heading
          layoutOfPage
          listItems {
            content
            title
            listitem {
              list
            }
          }
        }
         ... on PageBuilderPagesContainerLayout {
          content
          layout
          heading
            bgColor
          description
              formColumn {
            title
            inputPlaceholder
          }
          secondColImage {
            node {
            title
              sourceUrl
              altText
            }
          }
          firstColImage {
            node {
            title
              sourceUrl
              altText
            }
          }
          button1Link {
            url
            title
          }
          button2Link {
            url
            title
          }
          containerImage {
            node {
              altText
              title
              sourceUrl
            }
          }
        }
        ... on PageBuilderPagesBannerLayout {
          fieldGroupName
          banner {
            bannerImage {
              node {
              title
                sourceUrl
                altText
              }
            }
          }
        }
        ... on PageBuilderPagesCategoriesLayout {
          bgColor
          layout
          title
          categoryLink {
            icon {
              node {
              title
                sourceUrl
                altText
              }
            }
            link {
              title
              url
            }
          }
        }
        ... on PageBuilderPagesProductLayout {
        title
          productSection
          sidebarFilter {
            name
            filter {
              filtertext
            }
          }
          bgColor
          categoryNames {
            categories
          }
        }
      }
    }
  }
}`
export const GET_COLLECTION = gql`
  query MyQuery2 {
    productCategories {
      edges {
        node {
          name
          count
            uri
            description
            menuOrder
          slug
          image {
          altText
            sourceUrl
          }
        }
      }
    }
  }`
export const GET_NAVBAR = gql`
query NewQuery {
  menu(id: "dGVybToy") {
    name
    navbar {
      icons {
        icons
            icon {
          node {
            altText
            sourceUrl
          }
        }
      }
         pageLinks {
        link {
          title
          url
        }
      }
      logo {
        node {
          sourceUrl
          altText
        }
      }
    }
    menuItems {
      edges {
        node {
          uri
          label
        }
      }
    }
  }
}`
export const SEARCH_COLL= gql`
query GetProducts($search: String!) {
 productCategories(where: {search: $search}) {
    edges {
      node {
        name
        slug
      }
    }
  }
}`
export const SEARCH_QUERY=gql`
query GetProducts($search: String!) {
  products(first: 20, where: { search: $search }) {
    edges {
      node {
        ...on SimpleProduct {
        id
        name
        price
        slug
         productCategories {
            edges {
              node {
                uri
                name
                slug
              }
            }
          }
        featuredImage {
           node {
              sourceUrl
              altText
            }
        }
      }
      }
    }
  }
}`
export const GET_PRODUCT = gql`
query MyQuery2 {
  products(first:200) {
    edges {
      node {
        ... on SimpleProduct {
          id
          name
          price
          salePrice
          regularPrice
          productId
          stockStatus
          uri
          slug
          totalSales
          weight
             averageRating
          reviewCount
          sku
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          content
          productCategories {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}`
export const FILTER_PRODUCT = gql`
  query MyQuery2($id: ID !, $idType: ProductCategoryIdType = NAME) {
    productCategory(id: $id, idType: $idType) {
      id
      count
      name
      contentNodes {
        edges {
          node {
            ... on SimpleProduct {
              name
              price
              salePrice
              productId
              featuredImage {
            node {
              sourceUrl
              altText
            }
          }
            stockStatus
              image {
                sourceUrl
              }
                uri
            }
          }
        }
      }
    }
  }`
export const SINGLE_PRODUCT = gql`
query MyQuery2($id: ID!) {
  simpleProduct(id: $id, idType: SLUG) {
   
  attributes {
      edges {
        node {
          position
          label
          options
        }
      }
    }
  productId
   reviewCount
    reviews {
      edges {
        node {
          content
          date
          author {
            node {
              name
            }
          }
        }
        rating
      }
    }
    averageRating
    id
    content
    name
    uri
    price
    regularPrice
    stockStatus
    sku
    salePrice
    productId
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    productCategories {
      edges {
        node {
          name
          productCategoryId
        }
      }
    }
    galleryImages {
      edges {
        node {
          altText
          sourceUrl
        }
      }
    }
  }
}`
export const VAR_PRODUCT = gql`
query MyQuery2($id: ID!) {
  variableProduct(id: $id, idType: SLUG) {
   variations {
      edges {
        node {
          id
          stockQuantity
        }
      }
    }
  attributes {
      edges {
        node {
          position
          label
          options
        }
      }
    }
  productId
   reviewCount
    reviews {
      edges {
        node {
          content
          date
          author {
            node {
              name
            }
          }
        }
        rating
      }
    }
    averageRating
    id
    content
    name
    uri
    price
    regularPrice
    stockStatus
    sku
    salePrice
    productId
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    productCategories {
      edges {
        node {
          name
          productCategoryId
        }
      }
    }
    galleryImages {
      edges {
        node {
          altText
          sourceUrl
        }
      }
    }
  }
}`
export const GET_FOOTER = gql`
query MyQuery2 {
  pageBy (uri: "/footer") {
    pageBuilder {
      pages {
        ... on PageBuilderPagesFooterLayout {
          copyrightText
          description
          title
          columns {
            heading
            pagesLink {
              link {
                url
                title
              }
            }
          }
          socialIcons {
          link
            icons
          }
        }
      }
    }
  }
}`
export const COLLECTION_PRODUCT = gql`
  query MyQuery2($id: ID !, $idType: ProductCategoryIdType = SLUG) {
    productCategory(id: $id, idType: $idType) {
      id
      count
      name
      contentNodes {
        edges {
          node {
            ... on SimpleProduct {
              name
              price
              slug
              productId
              salePrice
              image {
                sourceUrl
              }
                uri
            }
          }
        }
      }
    }
  }`
